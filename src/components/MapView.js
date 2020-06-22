import React, {useEffect, useState} from 'react';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup, Polygon} from 'react-leaflet';

const MapView = ({coords, capital}) => {

    const state = {
        lat: coords[0],
        lng: coords[1],
        zoom: 13,
    }

    const position = [state.lat, state.lng];

    var myIcon = L.icon({
        iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41]
    });
    // 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    // 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

    // '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    var latlngs = [[38.566731101980785, -122.56506096183844], [38.56646685775345, -122.56524871646948],
        [38.56631586061583, -122.56515752136298],
        [38.566177446294304, -122.56500195324011],
        [38.56606419801475, -122.56515752136298],
        [38.56565734161215, -122.56546329319067],
        [38.56522426770422, -122.56577577054091],
        [38.56510525056776, -122.56551626681872],
        [38.564990427681025, -122.56524066984244],
        [38.565556675755005, -122.56454061328955],
        [38.565862867299316, -122.56418656169959],
        [38.56620261255444, -122.56392906963416]];

    // polygon -> onClick, onDblClick, onContextMenu, onMouseOut,
    const setBlockInfo = (info) => {
        // info is block object
        console.log('polygon clicked!!')
        // var pElem = document.getElementById('block-info').innerHTML = 'Block: 6P<br/>Variety: ME #3<br/>' +
        //     'Rootstock: 3309<br/>Spacing: 4\'x7\'<br/>Acres: 83<br/>Vines: 1,292<br/>Rows: 12-23';
        var tElem = document.getElementById('block-info');
        const blockKeys = Object.keys(info);
        const blockVals = Object.values(info)
        const blockPropLength = blockKeys.length;

        for (var i = 0; i < blockPropLength; i++) {
            var row = tElem.insertRow(i);
            var prop = row.insertCell(0).innerHTML = blockKeys[i].toUpperCase().fontcolor('orange');
            var val = row.insertCell(1).innerHTML = blockVals[i];
        }

        //console.log(pElem);
    }

    const blockInfo = {
        block: '6P',
        variety: 'ME #3',
        rootstock: '3309',
        spacing: '4\'x7\'',
        acres: '83',
        vines: '1,292',
        rows: '12-23',
    }

    return (
        <div>
            <Map className='map' center={position} zoom={state.zoom}>
                <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png'
                />
                <Polygon
                    positions={latlngs}
                    interactive='true'
                    color='orange'
                    fillColor='white'
                    onClick={() => setBlockInfo(blockInfo)}
                />
                <Marker position={position} icon={myIcon}>
                    <Popup>
                        Capital: {capital}
                    </Popup>
                </Marker>
            </Map>
            <div>
                <p><strong>BLOCK INFO</strong></p>
                <div style={{float:'right',width:'30%'}}>
                    <table id='block-info' style={{marginLeft: '20%', marginRight: '20%'}}></table>
                </div>
            </div>
        </div>
    );
}

export default MapView;