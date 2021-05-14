import React from 'react';

export default function SocialMedia(props){
    return(
        <div>
            <img src="images/social-icons.png" alt="Social icons"
                 className="templatemo-social-icons-img"/>
            <a href="http://www.facebook.com">
                <div id="facebook" className="templatemo-social-icon"></div>
            </a>
            <a href="http://www.twitter.com">
                <div id="twitter" className="templatemo-social-icon"></div>
            </a>
            <a href="http://plus.google.com">
                <div id="google" className="templatemo-social-icon"></div>
            </a>
            <a href="http://www.vimeo.com">
                <div id="vimeo" className="templatemo-social-icon"></div>
            </a>
            <a href="http://www.flickr.com">
                <div id="flickr" className="templatemo-social-icon"></div>
            </a>
        </div>
    );
}
