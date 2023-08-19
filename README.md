# hackerspace-notify

the software subscribes to a mqtt topic and notifys me when the hackerspace is open with push notifications from pushover



### Setup

make a folder with .env and docker-compose.yml file provided in this repo. 
.env file sould contain these vaiables 

```
MQTT_BROKER = 'mqtts://yourbrokerhost'

MQTT_USERNAME = 'Mqtt broker username'
MQTT_PASSWORD =  'password for your broker' 
MQTT_PORT = 1883
MQTT_TOPIC = 'topic'

PUSHOVER_USER = 'your user api key'
PUSHOVER_TOKEN = 'Your application token'

DISCORD_WEBHOOK= 'Webhook url'
DISCORD_ROLE= '<@&ROLE_ID_Here>'
```

To start the container run this command in the directory with the docker-compose file 


```bash
docker-compose up -d
```
