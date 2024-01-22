// import TabContent from './Tabs/TabContent';
// import StepSettings from './StepSettings';
// import { BlockSettings } from './blocks/BlockSettings';
// import Tabs from './Tabs/Tabs';
// import Tab, { TabProps } from './Tabs/Tab';
// import { Divider, Flex } from '@chakra-ui/react';
// import { Step } from '../../api/StepClient';
// import DataPreview from './DataPreview';

// interface EditSideBarProps {
//   step?: Step | null;
//   quizId?: string;
// }

// export function EditSideBar({ tabsData }: EditSideBarProps) {
//
//   return (
//     <div className="sidebar right-sidebar">
//       <Tabs>
//         <Flex gap={3}>
//           {tabsData?.map(({ id, title }) => (
//             <Tab key={id} id={id}>
//               {title}
//             </Tab>
//           ))}
//         </Flex>
//         <Divider className="tabs-divider" orientation="horizontal" />

//         <div className="tabs-content">
//           {tabsData?.map(({ id, component: TabComponent }) => (
//             <>
//               <TabContent id={id}>
//                 <TabComponent />
//               </TabContent>
//             </>
//           ))}
//         </div>
//       </Tabs>
//     </div>
//   );
// }

// export default EditSideBar;
