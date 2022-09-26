
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth, DefaultPaddingComponent, TitleComponent, DividerComponent, NblocksButton } from 'react-native-nblocks';
import React, { FunctionComponent } from 'react';
import { RoutesStackParams } from '../Routes';

const HomeScreen: FunctionComponent<{}> = () => {

    const navigation = useNavigation<NavigationProp<RoutesStackParams>>();
    const {logout} = useAuth();

      return (
        <DefaultPaddingComponent style={{flex: 1}}>
          <TitleComponent>Nblocks navigation test screen</TitleComponent>
          <DividerComponent />
          <NblocksButton
            onPress={() => navigation.navigate('UserProfile')}
            title="Go to UserProfile!"
          />
          <DividerComponent />
          <NblocksButton
            onPress={() => navigation.navigate('Users')}
            title="Go to Users!"
          />
          <DividerComponent />
          <NblocksButton
            onPress={() => navigation.navigate('Tenant')}
            title="Go to Tenant!"
          />
          <DividerComponent />
          <NblocksButton
            onPress={() => navigation.navigate('BrandExpo')}
            title="Go to Brand expo!"
          />
          <DividerComponent />
          <NblocksButton
            onPress={() => { navigation.navigate('ChooseUser') }}
            title="Switch user!"
          />
          <NblocksButton
            onPress={() => { logout() }}
            title="Logout!"
          />
        </DefaultPaddingComponent>
      )
}

export {HomeScreen};