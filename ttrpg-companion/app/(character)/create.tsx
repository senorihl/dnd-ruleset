import {Modal, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {Races, type Race, Classes, type Class, Backgrounds, type Background} from 'dnd-ruleset';
import {useTheme} from '@react-navigation/core';
import Octicons from "@expo/vector-icons/Octicons"
import React from "react";

const CreateCharacter: React.FC<{theme: ReturnType<typeof useTheme>}> = ({theme}) => {
    const [selection, setSelection] = React.useState<Partial<{ class: Class, race: Race, background: Background }>>({});

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
            <View style={[styles.box, {backgroundColor: theme.colors.card}]}>
                <View style={styles.boxHeader}>
                    <Text  style={styles.boxTitle}>Choose your class</Text>
                </View>
                <View style={styles.boxContent}>
                    {Classes.map(_class => (
                        <Pressable style={styles.picker} onPress={() => {
                            setSelection(selection => ({...selection, class: _class}))
                        }}>
                            <Octicons size={styles.boxText.fontSize} name={selection.class === _class ? 'check-circle-fill' : 'circle'} />
                            <Text style={styles.boxText}>{_class.name}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View style={[styles.box, {backgroundColor: theme.colors.card}]}>
                <View style={styles.boxHeader}>
                    <Text  style={styles.boxTitle}>Choose your race</Text>
                </View>
                <View style={styles.boxContent}>
                    {Races.map(_race => (
                        <Pressable style={styles.picker} onPress={() => {
                            setSelection(selection => ({...selection, race: _race}))
                        }}>
                            <Octicons size={styles.boxText.fontSize} name={selection.race === _race ? 'check-circle-fill' : 'circle'} />
                            <Text style={styles.boxText}>{_race.name}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View style={[styles.box, {backgroundColor: theme.colors.card}]}>
                <View style={styles.boxHeader}>
                    <Text  style={styles.boxTitle}>Choose your background </Text>
                </View>
                <View style={styles.boxContent}>
                    {Backgrounds.map(_background => (
                        <Pressable style={styles.picker} onPress={() => {
                            setSelection(selection => ({...selection, background: _background}))
                        }}>
                            <Octicons size={styles.boxText.fontSize} name={selection.background === _background ? 'check-circle-fill' : 'circle'} />
                            <Text style={styles.boxText}>{_background.name}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View style={{ }}>
                <View style={styles.boxHeader}>
                    <Text  style={styles.boxTitle}>Summary</Text>
                </View>
                <View style={styles.boxContent}>

                </View>
            </View>
        </ScrollView>
    );
}

export default function () {
    const theme = useTheme();
    return <CreateCharacter theme={theme} />
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'stretch',
        gap: 20,
        padding: 20
    },
    box: {
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    boxHeader: {
        padding: 10
    },
    boxContent: {
        padding: 10,
        paddingBottom: 20
    },
    boxTitle: {
        fontSize: 18,
        fontFamily: "NotoSerif",
        textAlign: 'center'
    },
    boxText: {
        fontSize: 15,
        fontFamily: "NotoSans",
        textAlign: 'left'
    },
    picker: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
        marginBottom: 5
    }
})