WITH scopes AS (SELECT DISTINCT scope FROM scope_members), counts AS (
SELECT s.scope,j.journal,COUNT(p.id) AS papers
FROM scopes s CROSS JOIN selected_journals j
LEFT JOIN scope_members m ON m.scope=s.scope
LEFT JOIN papers p ON p.id=m.id AND p.journal=j.journal
GROUP BY s.scope,j.journal)
SELECT scope,journal,papers,SUM(papers) OVER(PARTITION BY scope) AS denominator,
1.0*papers/SUM(papers) OVER(PARTITION BY scope) AS share
FROM counts ORDER BY scope,papers DESC,journal;