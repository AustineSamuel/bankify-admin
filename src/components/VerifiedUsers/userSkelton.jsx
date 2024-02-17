import React from 'react';
import { MDBListGroupItem, MDBBadge, MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import { ClipLoader } from 'react-spinners';
import CustomAvatar from '../../utils/customAvatar';
import Skeleton from '@mui/material/Skeleton';

const UserItemSkeleton = () => {
  return (
    <MDBListGroupItem style={{marginTop:5}} className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <div className="me-3">
          <Skeleton variant="circular" width={60} height={60} />
        </div>
        <div>
          <Skeleton width={200} height={20} />
          <Skeleton width={150} height={20} />
          <MDBBadge color="success" className='mobileOnly'>
            <Skeleton width={100} height={20} />
          </MDBBadge>
        </div>
      </div>
      <MDBBadge color="success" className='pcOnly'>
        <Skeleton width={100} height={20} />
      </MDBBadge>
      <div className='pcOnly'>
      <Skeleton width={60} height={24} />
        <Skeleton width={60} height={24} />
        <Skeleton width={60} height={24} />
              </div>
      <div className='mobileOnly' hidden>
        <MDBDropdown>
          <MDBDropdownToggle style={{ borderRadius: 30 }} c>
            <Skeleton width={100} height={20} />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link>
              <Skeleton width={120} height={24} />
            </MDBDropdownItem>
            <MDBDropdownItem link>
              <Skeleton width={120} height={24} />
            </MDBDropdownItem>
            <MDBDropdownItem link>
              <Skeleton width={120} height={24} />
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
    </MDBListGroupItem>
  );
};

export default UserItemSkeleton;
