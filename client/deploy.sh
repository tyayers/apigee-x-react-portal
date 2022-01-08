npm run build
rm -r -f "../service/public"
mkdir "../service/public"
cp -r "build/." "../service/public"
