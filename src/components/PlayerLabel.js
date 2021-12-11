import ricardo from '../graphics/memes/ricardo.png'
import revertedRicardo from '../graphics/memes/ricardo-reverted.png'
import shouter from '../graphics/shouter.png'
import skull from '../graphics/skull.png'


const getImage = (player, isSmall) => {
    const isReverted = Math.random() > 0.5;
    var icon = shouter;

    var yStart = isSmall ? 0: 5;
    const xRandom = 2*Math.random();
    const yRandom = yStart*Math.random();
    var imgStyle = {
        top: xRandom+'px',
        left:yRandom+'px'
    }
    var imgClass = 'mafia-player-image';
    if(player.IsDead){
        icon = skull;
        imgStyle["width"] =  isSmall ? "20px" : "30px";
        imgStyle["padding-bottom"] = '15px';
        imgStyle["padding-top"] = '24px';
    } else {
        switch(process.env.REACT_APP_PLAYER_ICON) {
            case 'player': icon = shouter;
            case 'ricardo': icon = isReverted ? revertedRicardo : ricardo;
        }
    
        imgStyle["animation-delay"] = ''+(Math.random()*1000)+'ms';
        imgStyle["width"] =  isSmall ? "40px" : "60px";
        imgStyle["padding-bottom"] = '5px';
        imgClass += '-moving';
    }

    return <img className={imgClass} src = {icon} style = {imgStyle}/>
}
const PlayerLabel = ({player, isSmall }) => {
    var playersInRow = isSmall? 4 : 3;
    var rowDiff = isSmall? 22: 30;
    var posX = Math.floor(player.Position/playersInRow);
    
    const posY = player.Position%playersInRow;
    const positionX = (25+16*posX)+'%'
    const positionY =  (posY*rowDiff)+'%'

    var image = getImage(player, isSmall);

    const style = {
        top: positionX,
        left: positionY,
        "font-size": isSmall ? "14px": "18px"
    }


    return <div className='mafia-player-container' style={style}>
            {image}
            <div className='mafia-player-label'>{player.Name}</div>
        </div>
}


export default PlayerLabel