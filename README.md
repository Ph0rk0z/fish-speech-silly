# Fish Speech

<div align="center">

**English** 

</div>

<div>
<a href="https://www.producthunt.com/posts/fish-speech-1-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fish&#0045;speech&#0045;1&#0045;4" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=488440&theme=light" alt="Fish&#0032;Speech&#0032;1&#0046;4 - Open&#0045;Source&#0032;Multilingual&#0032;Text&#0045;to&#0045;Speech&#0032;with&#0032;Voice&#0032;Cloning | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

<a href="https://trendshift.io/repositories/7014" target="_blank">
<img src="https://trendshift.io/api/badge/repositories/7014" alt="fishaudio%2Ffish-speech | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/>
</a>
</div>

<div>
<a target="_blank" href="https://discord.gg/Es5qTB9BcN">
<img alt="Discord" src="https://img.shields.io/discord/1214047546020728892?color=%23738ADB&label=Discord&logo=discord&logoColor=white&style=flat-square"/>
</a>
<a target="_blank" href="https://hub.docker.com/r/fishaudio/fish-speech">
<img alt="Docker" src="https://img.shields.io/docker/pulls/fishaudio/fish-speech?style=flat-square&logo=docker"/>
</a>
</div>

This codebase and all models are released under CC-BY-NC-SA-4.0 License. Please refer to [LICENSE](LICENSE) for more details.

## Info

This is fish speech for silly tavern. My crude implementation.


First pre-process your wavs with their tool. Then edit the fishtts.js for speaker names and your server IP.
The files are in SillyTavern/public/scripts/extensions/tts/



I have included styletts support too because I don't feel like editing the index to remove it.
https://github.com/longtimegone/StyleTTS2-Sillytavern-api


An example on how to start the server:

<pre>
CUDA_VISIBLE_DEVICES=3 python api_json.py \
    --listen 0.0.0.0:8000 \
    --llama-checkpoint-path "checkpoints/fish-speech-1.4" \
    --decoder-checkpoint-path "checkpoints/fish-speech-1.4/firefly-gan-vq-fsq-8x1024-21hz-generator.pth" \
    --decoder-config-name firefly_gan_vq \
    --half \
    --compile
</pre>

You can do so from the tools folder. No need to install it. Just have all the dependencies in your conda environment.
May however have to install the audio pre-processor.


Windows peeps, I'm sorry. Can't help you. 









