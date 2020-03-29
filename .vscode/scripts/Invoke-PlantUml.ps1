[CmdletBinding()]
param (
  # Glob to pass as argument to PlantUML
  [Parameter(Mandatory)]
  [string]
  $glob,
  # Glob to pass as argument to PlantUML
  [Parameter()]
  [string]
  $excludedGlob
)

process {
  java @(
    "-jar", "${env:PLANTUML_JAR}"
    "-progress"
    "-failfast"
    "-checkmetadata"
    "-charset", "UTF-8"
    # "-x", "**/style/*.pu"
    "-o", "img"
    $glob
  )
}
