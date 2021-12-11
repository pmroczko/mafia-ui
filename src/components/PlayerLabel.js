import icon from '../graphics/memes/ricardo.png'
import iconReverted from '../graphics/memes/ricardo-reverted.png'

const PlayerLabel = ({player, isSmall }) => {

    var playersInRow = isSmall? 4 : 3;
    var rowDiff = isSmall? 22: 30;
    var yStart = isSmall ? 0: 5;

    var posX = Math.floor(player.Position/playersInRow);
    
    const posY = player.Position%playersInRow;

    const xRandom = 2*Math.random();
    const yRandom = yStart*Math.random();

    const positionX =xRandom+(25+16*posX)+'%'
    const positionY = yRandom+(posY*rowDiff)+'%'

    const img = (Math.random() <= 0.5 ? icon: iconReverted)

    const style = {
        top: positionX,
        left: positionY,
        "font-size": isSmall ? "14px": "20px"
    }

    const imgStyle = {
        "animation-delay":''+(Math.random()*1000)+'ms',
        "width": isSmall ? "40px" : "60px",
    }

    return <div className='mafia-player-container' style={style}><img className='mafia-player-icon' src = {img} style = {imgStyle}/><div className='mafia-player-label'>{player.Name}</div></div>
}


export default PlayerLabel