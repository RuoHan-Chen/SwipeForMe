deploy:
	gcloud run deploy \
	--source . \
	--allow-unauthenticated \
	--region=us-central1 \
	--env-vars-file env.yml

dev:
	./gradlew bootRun

.PHONY: deploy dev