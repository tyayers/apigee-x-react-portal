npm run build
sudo rm -r -f "../service/public"
mkdir "../service/public"
cp -r "build/." "../service/public"
