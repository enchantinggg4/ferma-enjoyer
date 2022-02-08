cd ..
rm -rf packaged
mkdir packaged
cp manifest.json packaged/manifest.json
cp -r util packaged/util
mkdir packaged/app
cp -r app/dist packaged/app/dist
