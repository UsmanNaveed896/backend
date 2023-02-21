import { useEffect, useState } from "react"
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MainMap from '../map'
import {  InfoWindow,Marker  } from 'react-google-maps';
import { useNavigate } from 'react-router-dom';
export default()=>{
  const Navigate=useNavigate();
    const [state,setState]=useState({
        lat:"",
        long:""
    })
    useEffect(()=>{
        getLocation()
            },[])
            const getLocation=()=>{
                navigator.geolocation.getCurrentPosition(function(position) {
                    setState(st=>({
                        ...st,
                        lat:position.coords.latitude,
                        long:position.coords.longitude
                    }))
                    console.log("Latitude is :", position);
                    console.log("Longitude is :", position.coords.longitude);
                  });
            }
    const logOut=()=>{
      localStorage.removeItem("token");
      Navigate('/')
    }
           console.log("usman",state)
    return(
        <>
        <button className="mt-4 " style={{'margin-left':'10px'}} onClick={(e)=>{logOut(e)}}>LogOut</button>
        <h1 className="" style={{'textAlign':'center'}} >Your Location</h1>
        
        <div>
        <MainMap
                  googleMapURL=" https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="
                 
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `60vh` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                >
           
                    <Marker
                    
                      position={{
                        lat:state.lat,
                        lng:state.long
                      }}
                     
                    >
    
                    </Marker>
               
                {/* < MainMap state={state}/> */}
                </MainMap>
      </div >
        </>
    )
}