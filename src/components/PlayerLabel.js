import ricardo from '../graphics/memes/ricardo.png'
import shouter from '../graphics/shouter.png'

const PlayerLabel = ({player, isSmall }) => {

    var playersInRow = isSmall? 4 : 3;
    var rowDiff = isSmall? 22: 30;
    var yStart = isSmall ? 0: 5;

    var posX = Math.floor(player.Position/playersInRow);
    
    const posY = player.Position%playersInRow;

    const xRandom = 2*Math.random();
    const yRandom = yStart*Math.random();

    const positionX = (25+16*posX)+'%'
    const positionY =  (posY*rowDiff)+'%'

    var icon = process.env.REACT_APP_PLAYER_ICON == 'player'? shouter : ricardo;
    const isFlipped = Math.random() <= 0.5

    const style = {
        top: positionX,
        left: positionY,
        "font-size": isSmall ? "14px": "18px"
    }

    const imgStyle = {
        top: xRandom,
        left:yRandom,
        "animation-delay":''+(Math.random()*1000)+'ms',
        "width": isSmall ? "40px" : "60px",
    }

    if(isFlipped) {
        imgStyle["-webkit-transform"] = 'scaleX(-1)';
        imgStyle["transform"] = 'scaleX(-1)';
    }

    return <div className='mafia-player-container' style={style}><img className='mafia-player-icon' src = {icon} style = {imgStyle}/><div className='mafia-player-label'>{player.Name}</div></div>
}


export default PlayerLabel