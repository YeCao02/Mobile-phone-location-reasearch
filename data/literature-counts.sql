WITH scopes AS (SELECT DISTINCT scope FROM scope_members)
SELECT s.scope, CAST(y.year AS TEXT)||'年' AS year, COUNT(l.id) AS papers,
 SUM(COUNT(l.id)) OVER(PARTITION BY s.scope) AS denominator,
 CASE WHEN y.year=2026 THEN '截至2026年10月13日收录' ELSE '' END AS note
FROM scopes s CROSS JOIN years y
LEFT JOIN scope_members m ON m.scope=s.scope
LEFT JOIN literature l ON l.id=m.id AND l.year=y.year AND l.publication_type!='conference_abstract'
GROUP BY s.scope,y.year ORDER BY s.scope,y.year;

WITH scopes AS (SELECT DISTINCT scope FROM scope_members)
SELECT s.scope,d.domain,COUNT(l.id) AS papers,
 1.0*COUNT(l.id)/SUM(COUNT(l.id)) OVER(PARTITION BY s.scope) AS share,
 SUM(COUNT(l.id)) OVER(PARTITION BY s.scope) AS denominator
FROM scopes s CROSS JOIN domains d
LEFT JOIN scope_members m ON m.scope=s.scope
LEFT JOIN literature l ON l.id=m.id AND l.journal_domain=d.domain AND l.publication_type='journal_article'
GROUP BY s.scope,d.domain,d.rank ORDER BY s.scope,d.rank;