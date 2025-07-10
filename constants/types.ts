export type RenderMenuItemProps = {
  item: { name: string; title: string };
  style?: object;
  onPress?: () => void;
};

export interface FacultyItemProps {
  id: string;
  name: string;
  title: string;
  avatar: string;
}