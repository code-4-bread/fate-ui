//! TODO Revist later

// import React, { useState, useEffect } from 'react';
// import {
//   List, Box, Button, Text,
// } from 'grommet';
// import { useHistory } from 'react-router-dom';
// import { get } from '../../utils/request';
//
//
// const CurrentSessions = () => {
//   const [sessions, setSessions] = useState([]);
//
//   useEffect(() => {
//     const getSessions = async () => {
//       const result = await get('sessions');
//
//       const {
//         data,
//       } = result;
//
//       setSessions(data.data);
//     };
//
//     getSessions();
//   }, []);
//
//   return (
//     <List
//       primaryKey="title"
//       data={sessions}
//       step={10}
//       children={(item) => (
//         <Box direction="row" gap="medium">
//           <Box>
//             <Text weight="bold">{item.title}</Text>
//           </Box>
//         </Box>
//       )}
//     />
//   );
// };
//
// export default CurrentSessions;
