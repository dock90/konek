function join(names, group, includeGroupName) {
  if (includeGroupName) {
    names.push(group.name);
  }
  return names.join(' → ');
}

export function hierarchyLabel(group, groupList, includeGroupName) {
  const names = [];
  if (!group.ancestors || group.ancestors.length === 0) {
    return join(names, group, includeGroupName);
  }

  for (const ancestor of group.ancestors) {
    const ancestorGroup = groupList.find(g => g.groupId === ancestor.groupId);
    if (ancestorGroup) {
      names.push(ancestorGroup.name);
    }
  }

  return join(names, group, includeGroupName);
}
