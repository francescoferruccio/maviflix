export function ActorCard(props) {
    const profile_img_url = 'https://image.tmdb.org/t/p/w185/'
    // controllo se esiste una foto profilo e la setto dinamicamente
    // altrimenti inserisco un placeholder
    let profileImg;
    if(props.actor.profile_path) {
        profileImg = `${profile_img_url}${props.actor.profile_path}`;
    } else {
        profileImg = `images/attore.jpg`;
    }

    profileImg = <img src={ profileImg } />;
    
        return (
        <div className="actor-card">
            <div className='profile-img'>
                { profileImg }
            </div>
            <div className="profile-details">
                <h5>{ props.actor.name }</h5>
                <h6>nel ruolo di</h6>
                <h5>{ props.actor.character }</h5>
            </div>
        </div>
    )
}