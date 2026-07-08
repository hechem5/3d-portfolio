import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// --- Shared Utility ---
const formatContact = (d) => {
  const parts = [];
  if (d.location) parts.push(d.location);
  if (d.phone) parts.push(d.phone);
  if (d.email) parts.push(d.email);
  if (d.linkedin) parts.push(d.linkedin.replace(/^https?:\/\//, ''));
  return parts.join(' | ');
};

// ==========================================
// THEME: CLASSIC
// ==========================================
const classicStyles = StyleSheet.create({
  page: { padding: '30px 40px', fontFamily: 'Helvetica', backgroundColor: '#FFFFFF', color: '#000000' },
  headerName: { fontSize: 22, fontWeight: 'bold', color: '#1A3A73', textTransform: 'uppercase', marginBottom: 4 },
  headerRole: { fontSize: 12, color: '#000000', marginBottom: 4 },
  headerContact: { fontSize: 9, color: '#333333', marginBottom: 2 },
  headerLanguages: { fontSize: 9, color: '#333333', marginBottom: 8 },
  headerLine: { borderBottomWidth: 1.5, borderBottomColor: '#1A3A73', marginBottom: 10 },
  sectionTitleContainer: { borderBottomWidth: 1, borderBottomColor: '#1A3A73', marginBottom: 8, marginTop: 12, paddingBottom: 2 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#1A3A73', textTransform: 'uppercase' },
  summaryText: { fontSize: 9.5, lineHeight: 1.4, color: '#000000', textAlign: 'justify' },
  skillRow: { flexDirection: 'row', marginBottom: 3 },
  skillCategory: { fontSize: 9.5, fontWeight: 'bold', color: '#000000' },
  skillList: { fontSize: 9.5, color: '#000000' },
  itemBlock: { marginBottom: 8 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
  itemTitleLeft: { fontSize: 10, fontWeight: 'bold', color: '#000000', flex: 1 },
  itemTitleRight: { fontSize: 9.5, color: '#000000', textAlign: 'right' },
  itemSubtitleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  itemSubtitleLeft: { fontSize: 9.5, fontStyle: 'italic', color: '#333333' },
  bulletRow: { flexDirection: 'row', marginBottom: 3, paddingLeft: 4 },
  bulletPoint: { width: 10, fontSize: 9.5, color: '#000000' },
  bulletText: { flex: 1, fontSize: 9.5, lineHeight: 1.3, color: '#000000' }
});

const ClassicTemplate = ({ d }) => {
  const contactString = formatContact(d);
  return (
    <Page size="A4" style={classicStyles.page}>
      <View>
        <Text style={classicStyles.headerName}>{d.name || 'HECHEM KLAI'}</Text>
        <Text style={classicStyles.headerRole}>{d.role || 'Full Stack Developer'}</Text>
        {contactString && <Text style={classicStyles.headerContact}>{contactString}</Text>}
        {d.languages && <Text style={classicStyles.headerLanguages}>{d.languages}</Text>}
        <View style={classicStyles.headerLine} />
      </View>
      {d.summary && (
        <View>
          <View style={classicStyles.sectionTitleContainer}><Text style={classicStyles.sectionTitle}>SUMMARY</Text></View>
          <Text style={classicStyles.summaryText}>{d.summary}</Text>
        </View>
      )}
      {d.skills && d.skills.length > 0 && (
        <View>
          <View style={classicStyles.sectionTitleContainer}><Text style={classicStyles.sectionTitle}>TECHNICAL SKILLS</Text></View>
          {d.skills.map((s, i) => {
            const parts = s.split(':');
            if (parts.length > 1) {
              return (
                <View key={i} style={classicStyles.skillRow}>
                  <Text style={classicStyles.skillCategory}>{parts[0]}:</Text>
                  <Text style={classicStyles.skillList}> {parts.slice(1).join(':').trim()}</Text>
                </View>
              );
            }
            return <View key={i} style={classicStyles.skillRow}><Text style={classicStyles.skillList}>• {s}</Text></View>;
          })}
        </View>
      )}
      {d.keyProjects && d.keyProjects.length > 0 && (
        <View>
          <View style={classicStyles.sectionTitleContainer}><Text style={classicStyles.sectionTitle}>KEY PROJECT</Text></View>
          {d.keyProjects.map((p, i) => (
            <View key={i} style={classicStyles.itemBlock}>
              <View style={classicStyles.itemHeader}>
                <Text style={classicStyles.itemTitleLeft}>{p.title}</Text>
                <Text style={classicStyles.itemTitleRight}>{p.subtitle}</Text>
              </View>
              {(p.location || p.date) && (
                <View style={classicStyles.itemSubtitleContainer}>
                  <Text style={classicStyles.itemSubtitleLeft}></Text>
                  <Text style={classicStyles.itemTitleRight}>{p.location ? p.location + '  ' : ''}{p.date}</Text>
                </View>
              )}
              {p.points && p.points.map((pt, j) => (
                <View key={j} style={classicStyles.bulletRow}>
                  <Text style={classicStyles.bulletPoint}>•</Text>
                  <Text style={classicStyles.bulletText}>{pt}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
      {d.experience && d.experience.length > 0 && (
        <View>
          <View style={classicStyles.sectionTitleContainer}><Text style={classicStyles.sectionTitle}>EXPERIENCE</Text></View>
          {d.experience.map((e, i) => (
            <View key={i} style={classicStyles.itemBlock}>
              <View style={classicStyles.itemHeader}>
                <Text style={classicStyles.itemTitleLeft}>{e.title} {e.company ? `| ${e.company}` : ''}</Text>
                <Text style={classicStyles.itemTitleRight}>{e.date}</Text>
              </View>
              {e.points && e.points.map((pt, j) => (
                <View key={j} style={classicStyles.bulletRow}>
                  <Text style={classicStyles.bulletPoint}>•</Text>
                  <Text style={classicStyles.bulletText}>{pt}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
      {d.education && d.education.length > 0 && (
        <View>
          <View style={classicStyles.sectionTitleContainer}><Text style={classicStyles.sectionTitle}>EDUCATION</Text></View>
          {d.education.map((e, i) => (
            <View key={i} style={classicStyles.itemBlock}>
              <View style={classicStyles.itemHeader}>
                <Text style={classicStyles.itemTitleLeft}>{e.degree}</Text>
                <Text style={classicStyles.itemTitleRight}>{e.date}</Text>
              </View>
              <View style={classicStyles.itemSubtitleContainer}>
                <Text style={classicStyles.itemSubtitleLeft}>{e.school}</Text>
                <Text style={classicStyles.itemTitleRight}>{e.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
      {d.certifications && d.certifications.length > 0 && (
        <View>
          <View style={classicStyles.sectionTitleContainer}><Text style={classicStyles.sectionTitle}>CERTIFICATIONS & AWARDS</Text></View>
          {d.certifications.map((c, i) => (
            <View key={i} style={classicStyles.itemBlock}>
              <View style={classicStyles.itemHeader}>
                <Text style={classicStyles.itemTitleLeft}>{c.title}</Text>
                <Text style={classicStyles.itemTitleRight}>{c.date}</Text>
              </View>
              <Text style={classicStyles.itemSubtitleLeft}>{c.issuer}</Text>
              {c.points && c.points.map((pt, j) => (
                <View key={j} style={classicStyles.bulletRow}>
                  <Text style={classicStyles.bulletPoint}>•</Text>
                  <Text style={classicStyles.bulletText}>{pt}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </Page>
  );
};

// ==========================================
// THEME: MODERN
// ==========================================
const modernStyles = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', backgroundColor: '#FFFFFF' },
  sidebar: { width: '35%', backgroundColor: '#1A1A1A', padding: '30px 20px', color: '#FFFFFF' },
  main: { width: '65%', padding: '30px 30px', color: '#222222' },
  headerName: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  headerRole: { fontSize: 11, color: '#00E5FF', marginBottom: 20 },
  sidebarTitle: { fontSize: 12, fontWeight: 'bold', color: '#00E5FF', marginTop: 20, marginBottom: 10, textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 4 },
  sidebarText: { fontSize: 9, color: '#CCCCCC', marginBottom: 4, lineHeight: 1.4 },
  mainTitle: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A', marginTop: 15, marginBottom: 10, textTransform: 'uppercase', borderBottomWidth: 2, borderBottomColor: '#1A1A1A', paddingBottom: 4 },
  itemBlock: { marginBottom: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  itemTitleLeft: { fontSize: 11, fontWeight: 'bold', color: '#1A1A1A', flex: 1 },
  itemTitleRight: { fontSize: 9, color: '#666666', textAlign: 'right' },
  itemSubtitle: { fontSize: 9.5, fontStyle: 'italic', color: '#555555', marginBottom: 4 },
  bulletRow: { flexDirection: 'row', marginBottom: 3, paddingLeft: 4 },
  bulletPoint: { width: 10, fontSize: 9, color: '#555' },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.4, color: '#444' }
});

const ModernTemplate = ({ d }) => {
  return (
    <Page size="A4" style={modernStyles.page}>
      <View style={modernStyles.sidebar}>
        <Text style={modernStyles.headerName}>{d.name || 'HECHEM KLAI'}</Text>
        <Text style={modernStyles.headerRole}>{d.role || 'Full Stack Developer'}</Text>
        
        <Text style={modernStyles.sidebarTitle}>Contact</Text>
        {d.email && <Text style={modernStyles.sidebarText}>{d.email}</Text>}
        {d.phone && <Text style={modernStyles.sidebarText}>{d.phone}</Text>}
        {d.location && <Text style={modernStyles.sidebarText}>{d.location}</Text>}
        {d.linkedin && <Text style={modernStyles.sidebarText}>{d.linkedin.replace(/^https?:\/\//, '')}</Text>}
        
        {d.languages && (
          <>
            <Text style={modernStyles.sidebarTitle}>Languages</Text>
            {d.languages.split('•').map((l, i) => <Text key={i} style={modernStyles.sidebarText}>{l.trim()}</Text>)}
          </>
        )}

        {d.skills && d.skills.length > 0 && (
          <>
            <Text style={modernStyles.sidebarTitle}>Skills</Text>
            {d.skills.map((s, i) => {
              const parts = s.split(':');
              return (
                <View key={i} style={{ marginBottom: 6 }}>
                  {parts.length > 1 && <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#FFF' }}>{parts[0]}</Text>}
                  <Text style={modernStyles.sidebarText}>{parts.length > 1 ? parts.slice(1).join(':').trim() : s}</Text>
                </View>
              );
            })}
          </>
        )}
      </View>
      <View style={modernStyles.main}>
        {d.summary && (
          <View>
            <Text style={modernStyles.mainTitle}>Profile</Text>
            <Text style={{ fontSize: 9.5, lineHeight: 1.5, color: '#444' }}>{d.summary}</Text>
          </View>
        )}
        
        {d.experience && d.experience.length > 0 && (
          <View>
            <Text style={modernStyles.mainTitle}>Experience</Text>
            {d.experience.map((e, i) => (
              <View key={i} style={modernStyles.itemBlock}>
                <View style={modernStyles.itemHeader}>
                  <Text style={modernStyles.itemTitleLeft}>{e.title}</Text>
                  <Text style={modernStyles.itemTitleRight}>{e.date}</Text>
                </View>
                {e.company && <Text style={modernStyles.itemSubtitle}>{e.company}</Text>}
                {e.points && e.points.map((pt, j) => (
                  <View key={j} style={modernStyles.bulletRow}>
                    <Text style={modernStyles.bulletPoint}>•</Text>
                    <Text style={modernStyles.bulletText}>{pt}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {d.keyProjects && d.keyProjects.length > 0 && (
          <View>
            <Text style={modernStyles.mainTitle}>Projects</Text>
            {d.keyProjects.map((p, i) => (
              <View key={i} style={modernStyles.itemBlock}>
                <View style={modernStyles.itemHeader}>
                  <Text style={modernStyles.itemTitleLeft}>{p.title}</Text>
                  <Text style={modernStyles.itemTitleRight}>{p.date}</Text>
                </View>
                <Text style={modernStyles.itemSubtitle}>{p.subtitle} {p.location ? `- ${p.location}` : ''}</Text>
                {p.points && p.points.map((pt, j) => (
                  <View key={j} style={modernStyles.bulletRow}>
                    <Text style={modernStyles.bulletPoint}>•</Text>
                    <Text style={modernStyles.bulletText}>{pt}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {d.education && d.education.length > 0 && (
          <View>
            <Text style={modernStyles.mainTitle}>Education</Text>
            {d.education.map((e, i) => (
              <View key={i} style={modernStyles.itemBlock}>
                <View style={modernStyles.itemHeader}>
                  <Text style={modernStyles.itemTitleLeft}>{e.degree}</Text>
                  <Text style={modernStyles.itemTitleRight}>{e.date}</Text>
                </View>
                <Text style={modernStyles.itemSubtitle}>{e.school}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  );
};

// ==========================================
// THEME: MINIMALIST
// ==========================================
const minStyles = StyleSheet.create({
  page: { padding: '40px 50px', fontFamily: 'Helvetica', backgroundColor: '#FFFFFF', color: '#111111' },
  headerName: { fontSize: 26, letterSpacing: 2, textAlign: 'center', marginBottom: 6 },
  headerRole: { fontSize: 10, letterSpacing: 1, color: '#666', textAlign: 'center', textTransform: 'uppercase', marginBottom: 15 },
  headerContact: { fontSize: 8.5, color: '#444', textAlign: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 10, letterSpacing: 1.5, color: '#000', textTransform: 'uppercase', marginTop: 15, marginBottom: 10, textAlign: 'center' },
  summaryText: { fontSize: 9.5, lineHeight: 1.6, color: '#333', textAlign: 'center', marginBottom: 10 },
  itemBlock: { marginBottom: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  itemTitleLeft: { fontSize: 10, fontWeight: 'bold', color: '#000' },
  itemTitleRight: { fontSize: 9, color: '#888' },
  itemSubtitle: { fontSize: 9.5, color: '#555', marginBottom: 4 },
  bulletRow: { flexDirection: 'row', marginBottom: 4, paddingLeft: 10 },
  bulletPoint: { width: 12, fontSize: 9, color: '#888' },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.5, color: '#333' },
  skillCategory: { fontSize: 9.5, fontWeight: 'bold', color: '#000' },
  skillList: { fontSize: 9.5, color: '#444', lineHeight: 1.5 }
});

const MinimalistTemplate = ({ d }) => {
  const contactString = formatContact(d);
  return (
    <Page size="A4" style={minStyles.page}>
      <View>
        <Text style={minStyles.headerName}>{d.name || 'HECHEM KLAI'}</Text>
        <Text style={minStyles.headerRole}>{d.role || 'Full Stack Developer'}</Text>
        {contactString && <Text style={minStyles.headerContact}>{contactString}</Text>}
      </View>

      {d.summary && (
        <View>
          <Text style={minStyles.summaryText}>{d.summary}</Text>
        </View>
      )}

      {d.experience && d.experience.length > 0 && (
        <View>
          <Text style={minStyles.sectionTitle}>Experience</Text>
          {d.experience.map((e, i) => (
            <View key={i} style={minStyles.itemBlock}>
              <View style={minStyles.itemHeader}>
                <Text style={minStyles.itemTitleLeft}>{e.title}</Text>
                <Text style={minStyles.itemTitleRight}>{e.date}</Text>
              </View>
              {e.company && <Text style={minStyles.itemSubtitle}>{e.company}</Text>}
              {e.points && e.points.map((pt, j) => (
                <View key={j} style={minStyles.bulletRow}>
                  <Text style={minStyles.bulletPoint}>-</Text>
                  <Text style={minStyles.bulletText}>{pt}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {d.keyProjects && d.keyProjects.length > 0 && (
        <View>
          <Text style={minStyles.sectionTitle}>Projects</Text>
          {d.keyProjects.map((p, i) => (
            <View key={i} style={minStyles.itemBlock}>
              <View style={minStyles.itemHeader}>
                <Text style={minStyles.itemTitleLeft}>{p.title}</Text>
                <Text style={minStyles.itemTitleRight}>{p.date}</Text>
              </View>
              <Text style={minStyles.itemSubtitle}>{p.subtitle}</Text>
              {p.points && p.points.map((pt, j) => (
                <View key={j} style={minStyles.bulletRow}>
                  <Text style={minStyles.bulletPoint}>-</Text>
                  <Text style={minStyles.bulletText}>{pt}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {d.skills && d.skills.length > 0 && (
        <View>
          <Text style={minStyles.sectionTitle}>Skills</Text>
          {d.skills.map((s, i) => {
            const parts = s.split(':');
            return (
              <View key={i} style={{ flexDirection: 'row', marginBottom: 4 }}>
                {parts.length > 1 && <Text style={minStyles.skillCategory}>{parts[0]}: </Text>}
                <Text style={minStyles.skillList}>{parts.length > 1 ? parts.slice(1).join(':').trim() : s}</Text>
              </View>
            );
          })}
        </View>
      )}

      {d.education && d.education.length > 0 && (
        <View>
          <Text style={minStyles.sectionTitle}>Education</Text>
          {d.education.map((e, i) => (
            <View key={i} style={minStyles.itemBlock}>
              <View style={minStyles.itemHeader}>
                <Text style={minStyles.itemTitleLeft}>{e.degree}</Text>
                <Text style={minStyles.itemTitleRight}>{e.date}</Text>
              </View>
              <Text style={minStyles.itemSubtitle}>{e.school}</Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  );
};

// ==========================================
// MAIN ROUTER
// ==========================================
export const CVDocument = ({ data }) => {
  const d = data || {};
  const theme = d.designTheme || 'classic';

  return (
    <Document>
      {theme === 'modern' && <ModernTemplate d={d} />}
      {theme === 'minimalist' && <MinimalistTemplate d={d} />}
      {theme === 'classic' && <ClassicTemplate d={d} />}
    </Document>
  );
};
