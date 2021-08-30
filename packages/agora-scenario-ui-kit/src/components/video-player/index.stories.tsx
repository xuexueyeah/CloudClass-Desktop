import { Meta } from '@storybook/react';
import React, { FC, useDebugValue, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CameraPlaceHolder } from '~components';
import { Button } from '~components/button';
import { changeLanguage } from '~components/i18n';
import { VideoMarqueeList, VideoPlayer, VideoPlayerProps } from '~components/video-player';

const config = {
  muted: true,
  deviceState: 1,
  online: true,
  onPodium: true,
  userType: 'teacher',
  hasStream: true,
  isLocal: false,
  type: 'microphone',
  uid: '3232',
  disabled: true,
};
const meta: Meta = {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  args: {
    size: 10,
    username: 'Lily True',
    micEnabled: true,
    whiteboardGranted: true,
    // stars: 5,
    // micVolume: 0.95,
    // hasStream: false,
    // online: false,
    // isLocal: false,
    // isOnPodium: false,
    // userType: 'student',
    // controlPlacement: 'bottom',
    ...config,
    placeholder: (
      <img
        src="https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF"
        alt="placeholder"
        style={{
          display: 'inline-block',
          maxHeight: '100%',
          maxWidth: '100%',
          borderRadius: 4,
        }}
      />
    ),
  },
};

export const Docs: FC<VideoPlayerProps> = ({ children, ...restProps }) => {
  return (
    <div className="m-10">
      <VideoPlayer {...restProps} userType="teacher">
        {children}
      </VideoPlayer>
    </div>
  );
};

const student = {
  isHost: true,
  username: 'Lily True',
  stars: 5,
  micEnabled: true,
  whiteboardGranted: true,
  cameraEnabled: true,
  micVolume: 0.95,
  controlPlacement: 'bottom',
  hasStream: false,
  online: false,
  isLocal: false,
  isOnPodium: false,
  userType: 'student',
  placeholder: (
    <CameraPlaceHolder />
    // <img
    //   src="https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF"
    //   alt="placeholder"
    //   style={{
    //     display: 'inline-block',
    //     maxHeight: '100%',
    //     maxWidth: '100%',
    //     borderRadius: 4,
    //   }}
    // />
  ),
};

export const DocsMidClass = () => {
  const [studentList, setStudentList] = useState([]);

  const [teacherList, setTeacherList] = useState([
    {
      username: `teacher`,
      uid: `teacher`,
      micEnabled: false,
      cameraEnabled: false,
      whiteboardGranted: true,
      cameraDevice: 2,
      micDevice: 1,
      hasStream: true,
      online: true,
      isLocal: true,
      isOnPodium: false,
      userType: 'teacher',
      children: (
        <>
          <CameraPlaceHolder state={'loading'} />
        </>
      ),
    },
  ]);

  return (
    <div>
      <Button
        onClick={() => {
          setStudentList([
            ...studentList,
            {
              username: `student-${studentList.length}`,
              uid: `student-${studentList.length}`,
              micEnabled: false,
              cameraEnabled: false,
              whiteboardGranted: true,
              cameraDevice: 2,
              micDevice: 1,
              hasStream: true,
              online: true,
              isLocal: true,
              isOnPodium: false,
              userType: 'student',
              children: (
                <>
                  <CameraPlaceHolder state={'loading'} />
                </>
              ),
            },
          ]);
        }}>
        学生上台
      </Button>
      <Button
        onClick={() => {
          const copyArr = [...studentList];
          copyArr.splice(0, 1);
          setStudentList([...copyArr]);
        }}>
        学生下台
      </Button>
      {/* container use flex will be wrong */}
      <div className="storybook-video-container">
        <VideoMarqueeList
          openCarousel={false}
          teacherStream={teacherList[0]}
          teacherStreams={teacherList}
          videoStreamList={studentList}
          onCameraClick={(uid: any) => {}}
          onMicClick={(uid: any) => {}}
          onWhiteboardClick={(uid: any) => {}}
          onOffPodiumClick={(uid: any) => {}}
          onSendStar={(uid: any) => {}}></VideoMarqueeList>
      </div>
    </div>
  );
};

export const DocsBigClass: FC<VideoPlayerProps & { size: number }> = ({
  children,
  size,
  ...restProps
}) => {
  const [userType, setUserType] = useState<string>('teacher');

  const list_ = [...'.'.repeat(10)].map((_, i: number) => ({
    ...student,
    username: `${i}-${student.username}`,
    uid: `uuid-${i}`,
    micEnabled: false,
    cameraEnabled: false,
    whiteboardGranted: true,
    cameraDevice: 2,
    micDevice: 1,
    hasStream: i % 5 === 0 ? true : false,
    online: true,
    // online: i % 5 === 0 ? true : false,
    isLocal: i === 0,
    isOnPodium: false,
    userType: userType,
    children: <></>,
  })) as any[];

  const [list, setList] = useState(list_);

  useDebugValue(list, JSON.stringify);

  const roles = ['teacher', 'assistant', 'student', 'invisible'];

  return (
    //@ts-ignore
    <>
      <VideoMarqueeList
        openCarousel={false}
        videoStreamList={list}
        onCameraClick={(uid: any) => {
          list.forEach((item) => {
            if (item.uid === uid) {
              item.cameraEnabled = !item.cameraEnabled;
            }
          });
          setList([...list]);
          console.log('onCameraClick uid', uid);
        }}
        onMicClick={(uid: any) => {
          list.forEach((item) => {
            if (item.uid === uid) {
              item.micEnabled = !item.micEnabled;
            }
          });
          setList([...list]);
          console.log('onMicrophoneClick uid', uid);
        }}
        onWhiteboardClick={(uid: any) => {
          list.forEach((item) => {
            if (item.uid === uid) {
              item.whiteboardGranted = !item.whiteboardGranted;
            }
          });
          setList([...list]);
          console.log('onWhiteboard Click', uid);
        }}
        onOffPodiumClick={(uid: any) => {
          list.forEach((item) => {
            if (item.uid === uid) {
              item.isOnPodium = !item.isOnPodium;
            }
          });
          setList([...list]);
          console.log('off podium', uid);
        }}
        onSendStar={(uid) => {
          return new Promise((resolve) => {
            list.forEach((item) => {
              if (item.uid === uid) {
                item.stars += 1;
              }
            });
            setList([...list]);
            resolve('send star');
          });
        }}></VideoMarqueeList>
    </>
  );
};

export default meta;
