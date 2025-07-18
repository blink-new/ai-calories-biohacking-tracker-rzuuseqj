import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  Camera,
  Target,
  Brain,
  FlaskConical,
  BookOpen,
  Trophy,
  Plus,
  TrendingUp,
  Zap,
  Leaf,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface DashboardStats {
  caloriesConsumed: number;
  caloriesGoal: number;
  streakDays: number;
  points: number;
  level: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    caloriesConsumed: 1847,
    caloriesGoal: 2200,
    streakDays: 12,
    points: 2840,
    level: 7,
  });

  const progressPercentage = (stats.caloriesConsumed / stats.caloriesGoal) * 100;

  const quickActions = [
    { icon: Camera, label: 'Scan Meal', color: '#00D084' },
    { icon: Brain, label: 'Nootropics', color: '#7C3AED' },
    { icon: FlaskConical, label: 'Supplements', color: '#F59E0B' },
    { icon: BookOpen, label: 'Research', color: '#06B6D4' },
  ];

  const todaysTasks = [
    { id: 1, task: 'Log breakfast', completed: true, points: 50 },
    { id: 2, task: 'Take morning stack', completed: true, points: 30 },
    { id: 3, task: 'Scan lunch', completed: false, points: 50 },
    { id: 4, task: 'Evening meditation', completed: false, points: 40 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0A0F0A', '#1A2F1A', '#0A0F0A']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animated.View 
            style={styles.header}
            entering={FadeInUp.duration(600)}
          >
            <View>
              <Text style={styles.greeting}>Good morning, Biohacker</Text>
              <Text style={styles.subtitle}>Level {stats.level} • {stats.points} XP</Text>
            </View>
            <View style={styles.streakBadge}>
              <Zap size={16} color="#00D084" />
              <Text style={styles.streakText}>{stats.streakDays} day streak</Text>
            </View>
          </Animated.View>

          {/* Calorie Progress Circle */}
          <Animated.View 
            style={styles.progressSection}
            entering={FadeInDown.duration(600).delay(200)}
          >
            <View style={styles.progressContainer}>
              <View style={styles.progressCircle}>
                <View style={[styles.progressFill, { 
                  transform: [{ rotate: `${(progressPercentage * 3.6)}deg` }] 
                }]} />
                <View style={styles.progressInner}>
                  <Text style={styles.caloriesNumber}>{stats.caloriesConsumed}</Text>
                  <Text style={styles.caloriesLabel}>/ {stats.caloriesGoal} kcal</Text>
                  <Text style={styles.progressPercent}>{Math.round(progressPercentage)}%</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Quick Actions */}
          <Animated.View 
            style={styles.quickActionsSection}
            entering={FadeInDown.duration(600).delay(400)}
          >
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[styles.actionCard, { borderColor: action.color }]}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[`${action.color}20`, `${action.color}10`]}
                    style={styles.actionGradient}
                  >
                    <action.icon size={24} color={action.color} />
                    <Text style={styles.actionLabel}>{action.label}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Today's Tasks */}
          <Animated.View 
            style={styles.tasksSection}
            entering={FadeInDown.duration(600).delay(600)}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Tasks</Text>
              <View style={styles.pointsBadge}>
                <Trophy size={14} color="#F59E0B" />
                <Text style={styles.pointsText}>170 XP available</Text>
              </View>
            </View>
            
            {todaysTasks.map((task, index) => (
              <TouchableOpacity 
                key={task.id}
                style={[styles.taskCard, task.completed && styles.taskCompleted]}
                activeOpacity={0.8}
              >
                <View style={styles.taskContent}>
                  <View style={[styles.taskCheckbox, task.completed && styles.taskCheckboxCompleted]}>
                    {task.completed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                    {task.task}
                  </Text>
                </View>
                <View style={styles.taskPoints}>
                  <Text style={styles.taskPointsText}>+{task.points} XP</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Recent Meals */}
          <Animated.View 
            style={styles.mealsSection}
            entering={FadeInDown.duration(600).delay(800)}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Meals</Text>
              <TouchableOpacity style={styles.addButton}>
                <Plus size={16} color="#00D084" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.mealCard}>
              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>Avocado Toast with Eggs</Text>
                <Text style={styles.mealTime}>Breakfast • 8:30 AM</Text>
                <Text style={styles.mealCalories}>420 kcal</Text>
              </View>
              <View style={styles.mealMacros}>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>18g</Text>
                  <Text style={styles.macroLabel}>Protein</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>32g</Text>
                  <Text style={styles.macroLabel}>Carbs</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>28g</Text>
                  <Text style={styles.macroLabel}>Fat</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Insights */}
          <Animated.View 
            style={styles.insightsSection}
            entering={FadeInDown.duration(600).delay(1000)}
          >
            <Text style={styles.sectionTitle}>Biohacker Insights</Text>
            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Leaf size={20} color="#00D084" />
                <Text style={styles.insightTitle}>Optimal Timing</Text>
              </View>
              <Text style={styles.insightText}>
                Your cortisol levels are highest in the morning. Consider taking your nootropic stack 
                30 minutes after waking for maximum cognitive enhancement.
              </Text>
            </View>
          </Animated.View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0A',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#00D084',
    fontWeight: '500',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00D08420',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00D08440',
  },
  streakText: {
    color: '#00D084',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  progressSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1A2F1A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 8,
    borderColor: '#2A4F2A',
  },
  progressFill: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    borderColor: 'transparent',
    borderTopColor: '#00D084',
    transform: [{ rotate: '-90deg' }],
  },
  progressInner: {
    alignItems: 'center',
  },
  caloriesNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  caloriesLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  progressPercent: {
    fontSize: 16,
    color: '#00D084',
    fontWeight: '600',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  tasksSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A2F1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A4F2A',
  },
  taskCompleted: {
    backgroundColor: '#00D08420',
    borderColor: '#00D08440',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4B5563',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckboxCompleted: {
    backgroundColor: '#00D084',
    borderColor: '#00D084',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  taskTextCompleted: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  taskPoints: {
    backgroundColor: '#7C3AED20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  taskPointsText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '600',
  },
  mealsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00D08420',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00D08440',
  },
  mealCard: {
    backgroundColor: '#1A2F1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A4F2A',
  },
  mealInfo: {
    marginBottom: 12,
  },
  mealName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mealTime: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  mealCalories: {
    color: '#00D084',
    fontSize: 18,
    fontWeight: '700',
  },
  mealMacros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A4F2A',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  macroLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  insightsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  insightCard: {
    backgroundColor: '#1A2F1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A4F2A',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  insightText: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 20,
  },
});