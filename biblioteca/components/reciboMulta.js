import React from 'react';
import {Document, Page, View, Text, } from '@react-pdf/renderer';

export default function ReciboMulta () {
    <Document>
    <Page size="A4" >
      <View>
        <Text>Section #1</Text>
      </View>
      <View>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
}