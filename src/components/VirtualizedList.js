import React from 'react';
import {FlatList} from 'react-native';

export default function CustomVirtualizedView({children}) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <React.Fragment>{children}</React.Fragment>}
    />
  );
}
