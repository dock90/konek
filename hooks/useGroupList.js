import { useQuery } from "@apollo/react-hooks";
import { GROUPS_QUERY } from "../queries/GroupQueries";
import { useMemo } from "react";
import { hierarchyLabel } from "../components/groups/hierarchyLabel";

/**
 * @param options {{manageOnly: boolean, excludeGroupId: string | undefined, includeGroupName: boolean | undefined}}
 * @return {{data: Array<{
 *  groupId: string,
 *  name: string,
 *  hierarchy: string,
 * }>, loading: boolean, groups: Array<{}>}}
 */
export function useGroupList(options) {
  if (options.manageOnly === undefined) {
    throw new Error("`manageOnly` is required.");
  }
  const manageOnly = options.manageOnly,
    excludeGroupId = options.excludeGroupId,
    includeGroupName = !!options.includeGroupName;

  const { loading, data } = useQuery(GROUPS_QUERY);

  const result = useMemo(() => {
    if (loading) {
      return [];
    }
    const res = [];
    for (const group of data.groups) {
      if (manageOnly && !group.canManage) {
        // Skip group
        continue;
      }

      if (excludeGroupId) {
        if (
          // Exclude this group.
          group.groupId === excludeGroupId ||
          // Exclude when child of excluded group.
          (group.ancestors &&
            group.ancestors.find(a => a.groupId === excludeGroupId))
        ) {
          continue;
        }
      }

      res.push({
        groupId: group.groupId,
        name: group.name,
        hierarchy: hierarchyLabel(group, data.groups, includeGroupName)
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
  }, [loading, data]);

  return {
    loading,
    data: result,
    groups: loading ? [] : data.groups
  };
}
