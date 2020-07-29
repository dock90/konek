import { useQuery } from '@apollo/client';
import { GROUPS_QUERY } from '../queries/GroupQueries';
import { useMemo } from 'react';
import { hierarchyLabel } from '../components/groups/hierarchyLabel';
import { GroupsQuery, GroupsQuery_groups } from '../queries/types/GroupsQuery';

interface Options {
  manageOnly: boolean;
  excludeGroupId?: boolean | string;
  includeGroupName: boolean;
}

interface GroupListResults {
  loading: boolean;
  data: Array<GroupItem>;
  groups: Array<GroupsQuery_groups>;
}

interface GroupItem {
  groupId: string;
  name: string;
  hierarchy: string;
  group: GroupsQuery_groups;
}

export function useGroupList(options: Options): GroupListResults {
  if (options.manageOnly === undefined) {
    throw new Error('`manageOnly` is required.');
  }
  const manageOnly = options.manageOnly,
    excludeGroupId = options.excludeGroupId,
    includeGroupName = options.includeGroupName;

  const { loading, data } = useQuery<GroupsQuery>(GROUPS_QUERY);

  const result = useMemo(() => {
    if (loading) {
      return [];
    }
    const res: Array<GroupItem> = [];
    if (!data) {
      return res;
    }
    for (const group of data.groups) {
      if (options.manageOnly && !group.canManage) {
        // Skip group
        continue;
      }

      if (excludeGroupId) {
        if (
          // Exclude this group.
          group.groupId === excludeGroupId ||
          // Exclude when child of excluded group.
          (group.ancestors &&
            group.ancestors.find((a) => a.groupId === excludeGroupId))
        ) {
          continue;
        }
      }

      res.push({
        groupId: group.groupId,
        name: group.name,
        hierarchy: hierarchyLabel(group, data.groups, includeGroupName),
        group: group,
      });
    }

    return res.sort((a, b) => {
      const aVal = a.hierarchy.toLowerCase(),
        bVal = b.hierarchy.toLowerCase();
      if (aVal > bVal) {
        return 1;
      }
      if (aVal < bVal) {
        return -1;
      }
      return 0;
    });
  }, [loading, data, excludeGroupId, includeGroupName, manageOnly]);

  return {
    loading,
    data: result,
    groups: loading || !data ? [] : data.groups,
  };
}
