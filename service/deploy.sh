#Build and deploy client to cloud run (run script with your GCP Project Id as parameter)
gcloud config set project $1

npm run build
#gcloud builds submit --tag eu.gcr.io/$1/apigee-portal
docker build -t local/apigee-portal .
docker tag local/apigee-portal eu.gcr.io/$1/apigee-portal
docker push eu.gcr.io/$1/apigee-portal

gcloud run deploy apigee-portal --image eu.gcr.io/$1/apigee-portal --platform managed --project $1 \
  --region europe-west1 --allow-unauthenticated
