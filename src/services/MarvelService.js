class MarvelService {

    _apiBaseUrl = 'https://gateway.marvel.com:443/v1/public/';
    _apikeyUrl = 'apikey=9fb61c57134ab55e68fd8802cb715a34'
    getResource = async (url) => {
        let res  = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBaseUrl}characters?limit=9&offset=210&${this._apikeyUrl}`);
    }

     getAllCharacter = (id) => {
        return this.getResource(`${this._apiBaseUrl}characters/${id}?&${this._apikeyUrl}`);
    }
}

export default MarvelService;