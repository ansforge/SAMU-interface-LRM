cd ..;
cp -R stubs/lrm stubs/lrm2;
openapi-generator generate -i specs/swagger-lrm.json -g nodejs-express-server -o stubs/lrm;
cd stubs/lrm2;
cp package.json expressServer.js config.js ../lrm;
cd ../..;
rm -r stubs/lrm2;
