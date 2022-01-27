import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import React from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';



class RandomChar extends React.Component {

    constructor(props) {
        super(props);
        this.updateChar();
    }
    state = {
        char:{},
        loading: true,
        error:false,
    };

     lorem = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ";
     marvelService = new MarvelService();

     onError = () => {  
        this.setState({loading: false, error: true });
     }
    
    onCharLoaded = (char) => { //выполняется than дата с сервака пришла
        const {description} = char;
        char.description = (description.length > 80 ? description.substring(0,80) + ". . ." : description) || this.lorem;

        this.setState({char, loading:false});
    }

     updateChar = () => {
          const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
         this.marvelService // обращаемс к свойству которое нам дает экземпляр объекта нашего сервиса
            .getCharacter(id) // обращаемся к его методу, который по айдишке возвращаетт нам объект с данными
            .then(this.onCharLoaded)// т.к. операция асинхронная с поменткой async дожидаемося пока нам ответит сервак после чего усанавливем пришедший объект как текущий
                                    // равносильно текущей, т.к. если мы передадим чисто функцию то в нее автоматом капнет параметр из this который мы возвращали
                                    //т.е. равносильно res => { this.onCharLoaded(res)
            .catch(this.onError)//отловка нашей ошибки
            
     }

    render() {

        const{char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/>:null;
        const spinner = loading ? <Spinner/>:null;
        const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="randomchar"> 
            {errorMessage} 
            {spinner} 
            {content}
            <div className="randomchar__static">
                    <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )}
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char;
    console.log(char);

    return (<div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                             
                        </a>
                    </div>
                </div>
            </div>);
}

export default RandomChar;