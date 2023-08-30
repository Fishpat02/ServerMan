# ServerMan(ager)

This bot is a personal project, intended to be a sandbox for my typescript that slowly turned into an actually useful tool in my Discord servers. It can create/delete channels, threads and categories programmatically via the Discord interactions API. (Slash commands)

## Command guide
* `/create-channel` \
  Creates a channel, either inside a new or existing category, or without a category, with the following options:
  * `with-category <category_name> <channel_name>`
  * `new-category  <category_name> <channel_name>`
  * `no-category   <channel_name>`

* `create-thread` \
  Creates a thread inside of a given, existing channel.
  * `<channel_name> <thread_name>`
 
* `delete-channel` \
  Deletes a channel or category, and all channels contained within, with the following options:
  * `category <category_name>`
  * `channel <channel_name>`

## Deployment
This bot has also been made with mutliple deployment methods in mind, due to it's sandbox nature. These methods include Docker, Kubernetes and a NodeJS webserver.

* Docker \
  To deploy using Docker, you simply need to do as follows, assuming you have Docker installed on your system: `docker build .`

* KubeCTL \
  This is one of a few ways to use Kubernetes, however this is the one I have chosen to experiment with. That being said, this may easily be adapted. Keep in mind that this method depends on you having build the Docker image locally. \
  It is recommended that you tag it appropriately using the `-T <tag:name/version>` option of the previous method, and adjust the `smkube-deployment.yaml` file accordingly. \
  * `kubectl apply -f ./smkube-secrets.yaml`
  * `kubectl apply -f ./smkube-deployment.yaml`

* NodeJS \
  This is likely the easiest way to run this bot, and is as follows: `npm run start`
