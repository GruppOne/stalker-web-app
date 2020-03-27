###############
### testing ###
###############

FROM node:12.16 as testing

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# install chrome for protractor and karma tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub \
  | APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1 apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# version is not pinned because we always run tests on the most recent chrome version.
# hadolint ignore=DL3008
RUN apt-get update \
  && apt-get install -yq --no-install-recommends google-chrome-stable \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json /app/

# run a clean install
RUN npm ci

# add app
COPY . /app

# run tests
RUN npm run test -- --configuration=ci
RUN npm run e2e -- --configuration=ci

# TODO implement build configurations for various environments
########################
### production build ###
########################

FROM testing as build-production

# generate build
RUN npm run build -- --prod

#########################
### production deploy ###
#########################

FROM nginx:1.17-alpine as deploy-production

LABEL maintainer="gruppone.swe@gmail.com"

# copy artifact build from the 'build environment'
COPY --from=build-production /app/dist/stalker-web-app /usr/share/nginx/html

# TODO what about https? what should be done?
# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
