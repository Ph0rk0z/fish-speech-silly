import { doExtrasFetch, getApiUrl, modules } from '../../extensions.js';
import { saveTtsProviderSettings } from './index.js';

export { FishTtsProvider };

class FishTtsProvider {
    settings;
    ready = false;
    separator = '. ';
    speakers = ["shylily", "gura", "mococo", "nyanners", "vei"]; // List of available speakers

    defaultSettings = {
        provider_endpoint: 'http://192.168.1.211:8000',
        speaker: 'gura',
        emotion: 'default',
        voiceMap: {},
        maxt: 2048,
        chunk: 300,
        temperature: 0.7,
        topP: 0.7,
        rep: 1.2,
    };

    processText(text) {
        text = text.replace(/…/g, '...');
        text = text.replace(/["""'']/g, '');
        text = text.replace(/\.+/g, '.');
        return text;
    }

    get settingsHtml() {
        let html = `

        <label for="fishtts_tts_endpoint">Provider Endpoint:</label>
        <input id="fishtts_tts_endpoint" type="text" class="text_pole" maxlength="250" value="${this.defaultSettings.provider_endpoint}"/>

        <label for="fishtts_maxt">Max New Tokens: <span id="fishtts_maxt_display">${this.defaultSettings.maxt}</span></label>
        <input id="fishtts_maxt" type="range" min="512" max="2048" step="1" value="2048"/>

        <label for="fishtts_chunk">Chunk Length: <span id="fishtts_chunk_display">${this.defaultSettings.chunk}</span></label>
        <input id="fishtts_chunk" type="range" min="100" max="1024" step="1" value="200"/>

        <label for="fishtts_temperature">Temperature: <span id="fishtts_temperature_display">${this.defaultSettings.temperature}</span></label>
        <input id="fishtts_temperature" type="range" min="0" max="1" step="0.1" value="0.7"/>

        <label for="fishtts_topP">Top_P: <span id="fishtts_topP_display">${this.defaultSettings.topP}</span></label>
        <input id="fishtts_topP" type="range" min="0" max="1" step="0.1" value="0.7"/>

        <label for="fishtts_rep">Rep Pen: <span id="fishtts_rep_display">${this.defaultSettings.rep}</span></label>
        <input id="fishtts_rep" type="range" min="0" max="2" step="0.1" value="1.2"/>

       `;

        return html;
    }

    onSettingsChange() {
        this.settings.provider_endpoint = $('#fishtts_tts_endpoint').val();
        this.settings.speaker = $('#fishtts_api_speaker').val();
        this.settings.emotion = $('#fishtts_api_emotion').val();

        this.settings.maxt = parseFloat($('#fishtts_maxt').val()); // Grab and convert to number
        this.settings.chunk = parseFloat($('#fishtts_chunk').val()); // Grab and convert to number
        this.settings.temperature = parseFloat($('#fishtts_temperature').val()); // Grab and convert to number
        this.settings.topP = parseFloat($('#fishtts_topP').val()); // Grab and convert to number
        this.settings.rep = parseFloat($('#fishtts_rep').val()); // Grab and convert to number

        $('#fishtts_maxt').val(this.settings.maxt);
        $('#fishtts_maxt_display').text(this.settings.maxt);

        $('#fishtts_chunk').val(this.settings.chunk);
        $('#fishtts_chunk_display').text(this.settings.chunk);

        $('#fishtts_temperature').val(this.settings.temperature);
        $('#fishtts_temperature_display').text(this.settings.temperature);

        $('#fishtts_topP').val(this.settings.topP);
        $('#fishtts_topP_display').text(this.settings.topP);

        $('#fishtts_rep').val(this.settings.rep);
        $('#fishtts_rep_display').text(this.settings.rep);


        saveTtsProviderSettings();
    }

    async loadSettings(settings) {
        if (Object.keys(settings).length == 0) {
            console.info('Using default TTS Provider settings');
        }

        this.settings = { ...this.defaultSettings, ...settings };

        $('#fishtts_tts_endpoint').val(this.settings.provider_endpoint);
        $('#fishtts_tts_endpoint').on('input', () => { this.onSettingsChange(); });

        $('#fishtts_api_speaker').val(this.settings.speaker);
        $('#fishtts_api_speaker').on('change', () => { this.onSettingsChange(); });

        $('#fishtts_api_emotion').val(this.settings.emotion);
        $('#fishtts_api_emotion').on('input', () => { this.onSettingsChange(); });

        $('#fishtts_maxt').val(this.settings.maxt);
        $('#fishtts_maxt').on('input', () => { this.onSettingsChange(); });

        $('#fishtts_chunk').val(this.settings.chunk);
        $('#fishtts_chunk').on('input', () => { this.onSettingsChange(); });

        $('#fishtts_temperature').val(this.settings.temperature);
        $('#fishtts_temperature').on('input', () => { this.onSettingsChange(); });

        $('#fishtts_topP').val(this.settings.topP);
        $('#fishtts_topP').on('input', () => { this.onSettingsChange(); });

        $('#fishtts_rep').val(this.settings.rep);
        $('#fishtts_rep').on('input', () => { this.onSettingsChange(); });



        await this.checkReady();
        // Optionally fetch speakers from API if they're not hardcoded
        // this.speakers = await this.fetchSpeakersFromApi();

        console.debug('FISHTTS: Settings loaded');


                    $('#fishtts_maxt').val(this.settings.maxt);
                    $('#fishtts_maxt_display').text(this.settings.maxt);

                    $('#fishtts_chunk').val(this.settings.chunk);
                    $('#fishtts_chunk_display').text(this.settings.chunk);

                    $('#fishtts_temperature').val(this.settings.temperature);
                    $('#fishtts_temperature_display').text(this.settings.temperature);

                    $('#fishtts_topP').val(this.settings.topP);
                    $('#fishtts_topP_display').text(this.settings.topP);

                    $('#fishtts_rep').val(this.settings.rep);
                    $('#fishtts_rep_display').text(this.settings.rep);

    }


    async getVoices() {
        // Return speakers as voice objects
        return this.speakers.map(speaker => ({ name: speaker, id: speaker }));
    }

    async fetchTtsVoiceObjects() {
        // In a real implementation, you might fetch this from your API
        return this.getVoices();
    }

    async checkReady() {
        // Implement a readiness check if needed
        console.debug('FISHTTS: Check if ready');
        this.ready = true;
    }


    async getVoice(voiceName) {
        console.debug(`Searching for voice: ${voiceName}`);

        // Check if the voiceName is directly in the speakers array
        if (this.speakers.includes(voiceName)) {
            console.debug(`Voice found: ${voiceName}`);
            this.settings.speaker = voiceName;
            return { name: voiceName, voice_id: voiceName };
        }

        // If not found, return the first speaker as default
        console.warn(`Voice not found: ${voiceName}. Using default.`);
        this.settings.speaker - this.speakers[0];
        return { name: this.speakers[0], voice_id: this.speakers[0] };
    }


    async generateTts(text) {
        //console.debug(`Generating TTS for voice ID: ${voiceId}`);
        const voice = ''//await this.getVoice(voiceId);
        const speaker = voice ? voice.name : this.settings.speaker || this.speakers[0];
        const emotion = this.settings.emotion;
        const response = await this.fetchTtsGeneration(text, speaker, emotion);
        return response;
    }

    async fetchTtsGeneration(inputText, speaker, emotion) {
        console.info(`Generating TTS for speaker ${speaker} and emotion ${emotion}`);
        const response = await doExtrasFetch(
            `${this.settings.provider_endpoint}/v1/invoke`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Cache-Control': 'no-cache',
                },
                body: JSON.stringify({
                    text: inputText,
                    max_new_tokens: this.settings.maxt,
                    chunk_length: this.settings.chunk,
                    top_p: this.settings.topP,
                    repetition_penalty:this.settings.rep,
                    temperature: this.settings.temperature,
                    reference_id: this.settings.speaker,
                    format: 'wav',
                    streaming: false,
                }),
            },
        );
        if (!response.ok) {
            toastr.error(response.statusText, 'TTS Generation Failed');
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        return response;
    }
}
