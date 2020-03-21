#############
### build ###
#############

FROM node:12.16 as build

LABEL maintainer="gruppone.swe@gmail.com"

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# TODO test if needed
# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# hadolint ignore=DL3008
RUN apt-get update && apt-get install -yq --no-install-recommends google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json /app/
RUN npm install --quiet

# add app
COPY . /app

# run tests
RUN npm run --silent test -- --configuration=ci
RUN npm run --silent e2e -- --configuration=ci

# generate build
RUN npm run --silent build -- --prod

##################
### production ###
##################

FROM nginx:1.17-alpine

LABEL maintainer="gruppone.swe@gmail.com"

# copy artifact build from the 'build environment'
COPY --from=build /app/dist/stalker-web-app /usr/share/nginx/html

# TODO what about https? what should be done?
# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
