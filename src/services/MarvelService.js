class MarvelService {

    _apiBaseUrl = 'https://gateway.marvel.com:443/v1/public/';
    _apikeyUrl = 'apikey=9fb61c57134ab55e68fd8802cb715a34'
    
    getResource = async (url) => {
        let res  = await fetch(url); // фетчим данные

        if(!res.ok){ //если все плохо то выводиим ошибку и ее статус
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); // по урлу получаем доступ к нашей апишке и возвращаем в формате джсон наш биг обджект
    }

        getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBaseUrl}characters?limit=9&offset=210&${this._apikeyUrl}`);
        return res.data.results.map(this._transformCharacter);
    }

     getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBaseUrl}characters/${id}?&${this._apikeyUrl}`); // получаем наш пигобджект по вот такой вот апишке
        return this._transformCharacter(res.data.results[0]); // из нашего джсона, которы мы получили через урл подтягиваем нужные нам данные
    }

    _transformCharacter(char) {
        return {
                name: char.name,
                description: char.description,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,//превьюшка 
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
        }
    }

    _transformAllCharacters(char) {
        return {
                name: char.name,
                description: char.description,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,//превьюшка 
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
        }
    }
}

export default MarvelService;