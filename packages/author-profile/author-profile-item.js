import React from "react";
import get from "lodash.get";
import { StyleSheet, View } from "react-native";
import Card from "@times-components/card";
import Link from "@times-components/link";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: 10
  }
});

const AuthorProfileItem = item => {
  const {
    style,
    content,
    label,
    isLoading,
    onPress,
    publicationName,
    publishedTime,
    title,
    url
  } = item;

  const imageUri = get(
    item,
    "leadAsset.crop.url",
    get(item, "leadAsset.posterImage.crop.url", null)
  );

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <Card isLoading={isLoading} />
      </View>
    );
  }

  return (
    <Link url={url} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Card
          headline={title}
          text={content}
          image={imageUri ? { uri: imageUri } : null}
          date={publishedTime}
          label={label}
          publication={publicationName}
        />
      </View>
    </Link>
  );
};

export default AuthorProfileItem;
