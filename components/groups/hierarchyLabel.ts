import { GroupQuery_group } from '../../queries/types/GroupQuery';

function join(
  names: Array<string>,
  group: GroupQuery_group,
  includeGroupName: boolean,
) {
  if (includeGroupName) {
    names.push(group.name);
  }
  return names.join(' → ');
}

export function hierarchyLabel(
  group: GroupQuery_group,
  groupList: Array<GroupQuery_group>,
  includeGroupName: boolean,
) {
  const names: Array<string> = [];
  if (!group.ancestors || group.ancestors.length === 0) {
    return join(names, group, includeGroupName);
  }

  for (const ancestor of group.ancestors) {
    const ancestorGroup = groupList.find((g) => g.groupId === ancestor.groupId);
    if (ancestorGroup) {
      names.push(ancestorGroup.name);
    }
  }

  return join(names, group, includeGroupName);
}
