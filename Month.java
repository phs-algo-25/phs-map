
public class Month {

    private String name;
    private int days;
    private String birthstone;

    public Month(String name, int days, String birthstone) {
        this.name = name;
        this.days = days;
        this.birthstone = birthstone;
    }

    public String getName() {
        return name;
    }

    public int getDays() {
        return days;
    }

    public String getBirthstone() {
        return birthstone;
    }

    public String toString() {
        return name + " (" + days + " days, Birthstone: " + birthstone + ")";
    }
}
