import type { Database } from "@/types/database";
import { LearnerProfile, LearnerProfileRow } from "@/lib/learner-profiles";
import { SourceMaterial, SourceMaterialRow } from "@/features/source-materials";

export type LessonsRow = Database["public"]["Tables"]["lessons"]["Row"];

export type LessonsUpdate =
  Database["public"]["Tables"]["personalized_contents"]["Update"];

interface CreationMeta {
  learner_profile?: LearnerProfileRow;
  source_material?: SourceMaterialRow;
  [key: string]: unknown;
}

export class Lessons {
  constructor(private data: LessonsRow) {}

  asUpdate(): LessonsUpdate {
    return {
      title: this.data.title,
      description: this.data.description,
    };
  }

  // NOTE: if this ever accepts any camelCase `name`, this will need to
  // be adjusted to handle the transformation
  with(name: "title" | "description", value: string): Lessons {
    return new Lessons({ ...this.data, [name]: value });
  }

  get id() {
    return this.data.id;
  }

  get creationMeta(): CreationMeta {
    return (this.data.creation_meta ?? {}) as CreationMeta;
  }

  get learnerProfile(): LearnerProfile | null {
    const profileData = this.creationMeta.learner_profile;
    if (!profileData) return null;

    return new LearnerProfile(profileData);
  }

  get sourceMaterial(): SourceMaterial | null {
    const sourceMaterialData = this.creationMeta.source_material;
    if (!sourceMaterialData) return null;

    return new SourceMaterial(sourceMaterialData);
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }
}
