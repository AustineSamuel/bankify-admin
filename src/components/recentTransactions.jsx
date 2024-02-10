import React from 'react';
import {MDBBadge} from 'mdb-react-ui-kit';
import FadeInShade from './animations/fadeIn.tsx';
export default function RecentActivities() {
    return (
        <div>
            <h4>Recent Users Activities</h4>
            <div className="Activities_container">
                {[1,2,3,4,5].map((e,i)=>(<div className='Activities_card'><FadeInShade> <div key={i} className="d-flex align-items-center">
                    <img style={{width:60,height:60}} src="/images/drop.avif" className="card-img-top" alt="Transaction" />

                    <div>
                        <b>Face Verification</b><br/>
                        <span>Face verification completed successfully</span>
                     <br/>   <MDBBadge pill className='me-2 text-dark' color='light' light>
        23 hours ago
      </MDBBadge>
                    </div>
                </div></FadeInShade></div>))}
            </div>
        </div>
    );
}
