import React from 'react';
import {Tree} from 'antd';
import './index.scss'
const { DirectoryTree } = Tree;

const treeData = [
    {
        title: 'parent 0',
        key: '0-0',
        children: [
            { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
            { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
        ],
    },
    {
        title: 'parent 1',
        key: '0-1',
        children: [
            { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
            { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
        ],
    },
];

const TagList=()=>{
    const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };

    const onExpand = () => {
        console.log('Trigger Expand');
    };
    const changeItem=(keys, info)=>{
        console.log('changeItem Expand',keys, info);

    };

    return (
        <DirectoryTree
            defaultExpandAll
            className='tag-tree'
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
            onRightClick={changeItem}
        />
    )
};


export default TagList;
