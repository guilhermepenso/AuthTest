import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { queryAlarmesUsuario } from '../services/api/queryAlarmesUsuario';

export const Alarmes = () => {

    const [dados, setDados] = useState();

    // const dados = [
    //     { tipo_alarme: '1', unidade_consumidora: '123', numero_telemetria: '12345', status: 'Ativo' },
    //     { tipo_alarme: '2', unidade_consumidora: '456', numero_telemetria: '67890', status: 'Inativo' },
    //     // ... adicione mais itens conforme necessário
    // ];

    useEffect(() => {
        const dados = queryAlarmesUsuario();
        setDados(dados);
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#272525', alignItems: 'center'}}>
            <View style={{ marginTop: 350, width: '90%', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'darkgray', flexDirection: 'row'}}>
                <View style={{ borderColor: '#00000030', paddingHorizontal: 5}}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white'}}>
                        Alarme
                    </Text>
                </View>
                <View style={{ borderColor: '#00000030', paddingHorizontal: 5}}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white'}}>
                        UC
                    </Text>
                </View>
                <View style={{ borderColor: '#00000030', paddingHorizontal: 5}}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white'}}>
                        Telemetria
                    </Text>
                </View>
                <View style={{ borderColor: '#00000030', paddingHorizontal: 5}}>
                    <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white'}}>
                        Status
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: '#272525', alignItems: 'center' }}>
                {dados?.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            marginTop: 1,
                            minWidth: '90%',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            backgroundColor: 'lightgray',
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{ borderColor: '#00000030', paddingHorizontal: 5 }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'black' }}>
                                {item.tipo_alarme}
                            </Text>
                        </View>
                        <View style={{ borderColor: '#00000030', paddingHorizontal: 5 }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'black' }}>
                                {item.unidade_consumidora}
                            </Text>
                        </View>
                        <View style={{ borderColor: '#00000030', paddingHorizontal: 5 }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'black' }}>
                                {item.numero_telemetria}
                            </Text>
                        </View>
                        <View style={{ borderColor: '#00000030', paddingHorizontal: 5 }}>
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'black' }}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}