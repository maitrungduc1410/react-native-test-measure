import React, { useEffect } from 'react';
import { useState, type ReactNode, useRef } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
  View,
  findNodeHandle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-test-measure' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type TestMeasureNativeRef = {
  setNativeProps(props: {
    anchorRef?: null | number;
    templateRef?: null | number;
  }): void;
};

type TestMeasureProps = {
  ref?: React.RefObject<TestMeasureNativeRef>;
  style?: ViewStyle;
  children?: ReactNode;
};

const ComponentName = 'TestMeasureView';

export const NativeTestMeasureView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<TestMeasureProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

interface IProps {
  children: ReactNode;
  renderTemplate: () => ReactNode;
}

export const TestMeasureView = ({ children, renderTemplate }: IProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const anchorRef = useRef<View>(null);
  const templateRef = useRef<View>(null);
  const testMeasureViewRef = useRef<TestMeasureNativeRef>(null);

  useEffect(() => {
    testMeasureViewRef.current!.setNativeProps({
      anchorRef: findNodeHandle(anchorRef.current),
    });
  }, []);

  const onTemplateReady = () => {
    testMeasureViewRef.current!.setNativeProps({
      templateRef: findNodeHandle(templateRef.current),
    });
  };

  return (
    <View>
      <NativeTestMeasureView
        style={{ width: 300, height: 300 }}
        ref={testMeasureViewRef}
      >
        {visible && (
          <View
            ref={templateRef}
            onLayout={() => {
              onTemplateReady();
            }}
            collapsable={false}
            style={{ width: 300, height: 300 }}
          >
            {renderTemplate()}
          </View>
        )}
      </NativeTestMeasureView>
      <View
        ref={anchorRef}
        collapsable={false}
        onTouchStart={() => {
          !visible && setVisible(true);
        }}
      >
        {children}
      </View>
    </View>
  );
};
