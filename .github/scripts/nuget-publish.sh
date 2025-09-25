#!/usr/bin/env bash
for match in ./JellyfinLoaderStub/build/*/bin/Release/*.nupkg; do
  dotnet nuget push "$match" --api-key "$NUGET_PUBLISH_KEY" --source https://api.nuget.org/v3/index.json
done