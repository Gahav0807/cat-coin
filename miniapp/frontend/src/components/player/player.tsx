'use client';
import './player.css';

export default function Friend({number_of_player,player_name,player_clicks}){
    return(
        <div className='player'>
            <p className='number-of-player'>{number_of_player}.</p> 
            <div className='player-avatar'>CR</div>
            <p className='player-name'>{player_name}</p> 
            <p className='clicks'>{player_clicks}</p> 
        </div>
    )
}
