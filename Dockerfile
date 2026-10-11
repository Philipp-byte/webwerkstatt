# WebWerkstatt Schulmodus: baut die App und startet den Flask-Server mit gunicorn.
#   docker build -t webwerkstatt .
#   docker run -d --name webwerkstatt -p 8000:8000 -v webwerkstatt-daten:/data webwerkstatt
#   docker exec -it webwerkstatt python app.py create-admin admin <passwort>
# Die Datenbank liegt im Volume /data (Backup = Volume sichern).

FROM node:22-alpine AS build
WORKDIR /app
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ENV WEBWERKSTATT_BASE=/
RUN npm run build

FROM python:3.12-slim
WORKDIR /app/server
COPY server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt gunicorn
COPY server/ ./
COPY --from=build /app/dist /app/dist
ENV WEBWERKSTATT_INSTANCE=/data WEBWERKSTATT_DIST=/app/dist PORT=8000
VOLUME /data
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--threads", "4", "--access-logfile", "-", "app:app"]
