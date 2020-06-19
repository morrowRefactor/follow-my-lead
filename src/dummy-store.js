export default {
    'routeTypes': [
        {
            id: 1,
            type: 'Tourist'
        },
        {
            id: 2,
            type: 'Historical'
        },
        {
            id: 3,
            type: 'Personal'
        }
    ],
    'locations': [
        {
            id: 1,
            city: 'Santa Cruz',
            state_province: 'California',
            country: 'United States'
        },
        {
            id: 2,
            city: 'Dublin',
            state_province: 'Leinster',
            country: 'Ireland'
        }
    ],
    'routes': [
        {
            id: 1,
            route_name: 'Tour Santa Cruz',
            route_summ: 'See the hotspots of Santa Cruz',
            route_type_id: 1,
            route_location: 1
        },
        {
            id: 2,
            route_name: 'Historic Dublin',
            route_summ: 'A historic tour of Dublin',
            route_type_id: 2,
            route_location: 2
        },
        {
            id: 3,
            route_name: 'My Personal Santa Cruz',
            route_summ: 'All my favorite places in SC',
            route_type_id: 3,
            route_location: 1
        }
    ],
    'destinations': [
        {
            id: 1,
            destination: 'First Stop',
            sequence_num: 1,
            content: 'The first stop on this tourist trip',
            route_id: 1,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 2,
            destination: 'Second Stop',
            sequence_num: 2,
            content: 'The second stop on this tourist trip',
            route_id: 1,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 3,
            destination: 'Third Stop',
            sequence_num: 3,
            content: 'The third stop on this touritst trip',
            route_id: 1,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 4,
            destination: 'First Stop',
            sequence_num: 1,
            content: 'The first stop on this historic tour',
            route_id: 2,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 5,
            destination: 'Second Stop',
            sequence_num: 2,
            content: 'The second stop on this historic tour',
            route_id: 2,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 6,
            destination: 'Third Stop',
            sequence_num: 3,
            content: 'The third stop on this historic tour',
            route_id: 2,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 7,
            destination: 'Fourth Stop',
            sequence_num: 4,
            content: 'The fourth stop on this historic tour',
            route_id: 2,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 8,
            destination: 'First Stop',
            sequence_num: 1,
            content:'The first stop on this personal tour',
            route_id: 3,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 9,
            destination: 'Second Stop',
            sequence_num: 2,
            content: 'The second stop on this personal tour',
            route_id: 3,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 10,
            destination: 'Third Stop',
            sequence_num: 3,
            content: 'The third stop on this personal tour',
            route_id: 3,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 11,
            destination: 'Fourth Stop',
            sequence_num: 4,
            content: 'The fourth stop on this personal tour',
            route_id: 3,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        },
        {
            id: 12,
            destination: 'Fifth Stop',
            sequence_num: 5,
            content: 'The fifth stop on this personal tour',
            route_id: 3,
            address: '20 W 34th St',
            destLat: 40.748817,
            destLng: -73.985428
        }
    ]
}