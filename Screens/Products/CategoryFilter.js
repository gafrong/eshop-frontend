import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView, Text  } from "react-native";
import { ListItem, Badge } from '@rneui/themed';

const categoryStatus = '';

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{backgroundColor: '#f2f2f2'}}
        >
            <ListItem style={{margin: 0, padding:0, borderRadius: 0}}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.categoryFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge
                        style={[styles.center, {margin:5},
                            props.active == -1 ? styles.active : styles.inactive
                        ]}
                        value="All"
                    >
                    </Badge>
                </TouchableOpacity>
                {props.categories.map((item) => (
                    <TouchableOpacity
                        key={item._id.$oid}
                        onPress={() => {
                            props.categoryFilter(item._id.$oid), 
                            props.setActive(props.categories.indexOf(item))
                        }}
                    >
                        <Badge
                            style={[styles.center, 
                                {margin:5},
                                props.active == props.categories.indexOf(item) ? styles.active : styles.inactive 
                            ]}
                            value={item.name}
                        ></Badge>
                    </TouchableOpacity>                  
                ))}
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {
        backgroundColor: 'orage'
    },
    inactive: {
        backgroundColor: '#a0e1eb'
    }
})

export default CategoryFilter;