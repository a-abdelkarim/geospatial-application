function getMapLayer(map)
{
    let layerList = [];
    map.layers.forEach((layer) => {
        layerList.push({layer});
    });
    
    return layerList;
}
