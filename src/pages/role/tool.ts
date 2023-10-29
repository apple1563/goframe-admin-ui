// 将apiList转成分组的数据格式
/* [{
    group: '分组一',
    children: [
      { label: '选项一', value: 1 },
      { label: '选项二', value: 2 },
    ],
  }] */
type DataItemType = {
  group: string;
  children: Array<ChildItemType>;
};

type ChildItemType = {
  label: string;
  value: number;
};

type DataParam = {
  group: string;
  url: string;
  method: string;
};

export function listToGroup(data: Array<DataParam>): Array<DataItemType> {
  return data.reduce((acc, item) => {
    // 查找具有相同分组的现有项
    const existingGroup = acc.find((group) => group.group === item.group);

    if (existingGroup) {
      // 如果分组已存在，将项目添加到子项数组
      existingGroup.children.push({ label: `${item.url}-${item.method}`, value: `${item.url}-${item.method}` });
    } else {
      // 如果分组不存在，创建一个新分组对象
      acc.push({
        group: item.group,
        children: [{ label: `${item.url}-${item.method}`, value: `${item.url}-${item.method}` }],
      });
    }

    return acc;
  }, []);
}
