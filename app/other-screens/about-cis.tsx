import Screen from "@/components/Screen";
import Colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const About = () => {
  return (
    <Screen>
      <View style={[styles.content, {}]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>
              About Faculty of Communication and Information Sciences
            </Text>
            <Text style={styles.paragraph}>
              The Faculty of Communication and Information Sciences was
              established in June 2008 with Senate approval as an unprecedented
              innovative way of converging all fields’ communication and
              information under one umbrella of a Faculty. Thus, the Faculty,
              when it was established, was one of its kinds in the Nigeria
              university system, and it remains the only one of its kinds
              up-to-date in Nigeria. The laudable dream and vision of the
              Faculty was conceptualized by Professor Isha’aq Oloyede, who was
              at the time of establishing the Faculty, the Vice-Chancellor of
              the University.
            </Text>
            <Text style={styles.paragraph}>
              In establishing the Faculty, the Department of Computer Science,
              which was hitherto in the old Faculty of Physical Sciences, was
              pulled out of the Faculty, just like the Department of Mass
              Communication was pulled out of the old Faculty of Business and
              Social Sciences to be the foundational Departments in the new
              Faculty of Communication and Information Sciences. The other three
              Departments that constituted the Faculty were newly established at
              the point of establishing the Faculty. Thus, the Faculty is made
              up of five Departments offering communication-related courses at
              both the undergraduate and postgraduate level.
            </Text>
            <Text style={styles.sectionTitle}>Departments</Text>
            <Text style={styles.paragraph}>
              The Departments are:
              {"\n"}• Computer Science (originally in the old Faculty of
              Physical Sciences)
              {"\n"}• Mass Communication (originally in the old Faculty of
              Business and Social Sciences)
              {"\n"}• Library and Information Science (newly established at the
              inception of the Faculty)
              {"\n"}• Telecommunication Science (newly established at the
              inception of the Faculty)
              {"\n"}• Information Technology (formerly Information and
              Communication Science, established at the inception of the
              Faculty)
            </Text>
            <Text style={styles.paragraph}>
              The Faculty commenced academic operations at the beginning of the
              2008/2009 academic session, with Dr. (now Professor) Veronica O.
              Mejabi as the pioneer Acting Dean of the Faculty, running
              undergraduate programmes in Computer Science and Mass
              Communication, which had started from their old Faculties of
              Physical Sciences and Business and Social Sciences respectively.
              The other three newly created Departments commenced their
              respective programmes in 2010. The Faculty started its academic
              operations at Block 10 and part of the old Faculty of Education
              Building, but it eventually moved in 2010 to its permanent Faculty
              Building, which was the best and most enviable building in the
              University at the time.
            </Text>
            <Text style={styles.sectionTitle}>Growth and Leadership</Text>
            <Text style={styles.paragraph}>
              With the successive reign of other Deans like Professor Lenrie
              Aina, Professor Joseph S. Sadiku, Professor Rasheed G. Jimoh, and
              Professor Adesina L. Azeez, the Faculty has grown in leaps and
              bounds. They have individually in their different capacities
              passionately pursued the Faculty’s vision of becoming a flagship
              Faculty of Communication and Information, and have really pushed
              the Faculty to the height of scholarship and ranking as desired by
              the founding fathers of the Faculty.
            </Text>
            <Text style={styles.paragraph}>
              Today, the Faculty has grown remarkably with a fulfillment that
              the dreams of its founding fathers are not shattered. Each of the
              Departments in the Faculty had graduated an average of not less
              than 15 sets, thereby building up a virile and successful alumni
              body. It has produced two Researchers of the Year in the
              University while many of its faculties have served the University
              in various capacities. For instance, the last two successive
              University Librarians, including the current one, are from the
              Faculty, while many of our faculties had been released to go on
              leave of absence to many neighbouring institutions to serve as
              Vice Chancellors and Librarians. The Faculty has won various
              grants for impactful research, both from national and
              international funding agencies, through which the Faculty has
              built up a commendable and enviable research portfolio.
            </Text>
            <Text style={styles.sectionTitle}>Research and Publications</Text>
            <Text style={styles.paragraph}>
              To reinforce its commitment to research as veritable support for
              its quality teaching and training, the Faculty publishes the{" "}
              <Text style={styles.highlight}>
                International Journal of Information Processing and
                Communication (IJIPC)
              </Text>
              , an open-access, peer-reviewed, bi-annual journal. The journal’s
              URL is{" "}
              <Text style={styles.highlight}>
                https://ijipc.net.ng/index.php/ijipc/index
              </Text>
              . In addition, the Department of Computer Science publishes
              biannually the{" "}
              <Text style={styles.highlight}>
                Ilorin Journal of Computer Science and Information Technology
                (ILJCSIT)
              </Text>
              , the Department of Mass Communication publishes biannually a
              journal titled{" "}
              <Text style={styles.highlight}>Social Media Discourse</Text>,
              while the Department of Library and Information Science also
              houses a journal known as{" "}
              <Text style={styles.highlight}>
                Ilorin Varsity International Journal of Library and Information
                Science
              </Text>
              .
            </Text>
            <Text style={styles.paragraph}>
              Without any fear of contradiction, the Faculty of Communication
              and Information Sciences is now a flagship Faculty, which we are
              very proud of, and which is steadily growing into an enviable
              center of excellence for communication and information
              scholarship. The founding fathers of the Faculty shall ever be
              appreciated for their vision and foresightedness. As the Faculty
              grows in leaps and bounds, and as it rededicates itself to the
              vision for which it was established, we shall continue to adore
              and pray for all the visionary leaders that conceptualised and
              nurtured the inception of the Faculty. We shall be indebted to
              them for pioneering this first of its kind faculty in the Nigerian
              university system with laudable objectives from which we have
              never derailed. Likewise, we will continue to remember, with a
              high sense of gratitude, the sacrifices and genuine efforts that
              our retired past Deans and leaders made to reinforce the pillars
              that gripped the strong foundation upon which the Faculty has been
              thriving.
            </Text>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFF",
    elevation: 2,
  },
  backButton: { padding: 4 },
  scrollContent: { flex: 1 },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
    marginVertical: 12,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 12,
    textAlign: "justify",
  },
  highlight: {
    fontWeight: "500",
    color: Colors.primary,
  },
});

export default About;
